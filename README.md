# copilot-custom-config-template

**[English](README.md)** | [日本語](README.ja.md)

> Template collection of `.github/` config files to customize GitHub Copilot in VS Code

Tired of fixing Copilot's output every single time?

Drop a few Markdown files into `.github/` and Copilot will follow your coding conventions, use better naming, and automate repetitive tasks. Even a single `copilot-instructions.md` makes a noticeable difference — with the full setup, output quality improves by roughly 70–80%.

> **⚠️ Security**: Files under `.github/` are committed to Git. Never put API keys, tokens, or internal URLs in these files.

## 5 Types of Config Files

| # | File | When It Applies | What It Does |
|---|------|----------------|-------------|
| ❶ | `copilot-instructions.md` | **Always auto-applied** ⭐️ | Enforce coding standards and ground rules |
| ❷ | `*.instructions.md` | Auto-applied by file path match | Per-filetype detailed rules |
| ❸ | `*.prompt.md` | Manually via `/` in chat | Templatize repetitive tasks |
| ❹ | `*.agent.md` | Agent picker dropdown | Custom agents with specific expertise |
| ❺ | `SKILL.md` | Auto by keyword or `/` manually | Inject domain knowledge and best practices |

## Quick Start

### Minimal Setup (1 minute)

Just place one `copilot-instructions.md` file:

```bash
mkdir -p .github
cat << 'EOF' > .github/copilot-instructions.md
# AI Guidelines

## Role
Act as a senior engineer.

## Coding Standards
- Use specific variable names (data → userList, result → queryResult)
- Comments explain Why, not What
- Use specific exception classes for error handling

## Principles
- Do not implement features not in the requirements
- Ask before proceeding if anything is unclear
- Do not refactor existing code unless explicitly asked
EOF
```

Open Copilot Chat and try any prompt. You'll notice `any` types disappear and naming becomes more intentional right away.

### Full Setup

Copy the `.github/` directory from this repo into your project and edit to match your stack:

```bash
git clone https://github.com/akikisai/copilot-custom-config-template.git

cp -r copilot-custom-config-template/.github your-project/

# Remove files you don't need, then edit the rest to fit your stack
```

## File Structure

This is an example layout. Adapt it to your own project as needed.

```
.github/
├── copilot-instructions.md              # ❶ Base rules applied to every chat
├── instructions/
│   ├── frontend.instructions.md         # ❷ React/TypeScript (auto on *.tsx)
│   ├── backend.instructions.md          # ❷ Ruby on Rails (auto on *.rb)
│   └── docs.instructions.md             # ❷ Markdown (auto on *.md)
├── prompts/
│   ├── create-component.prompt.md       # ❸ Generate React components
│   ├── generate-test.prompt.md          # ❸ Generate test code
│   ├── pr-description.prompt.md         # ❸ Auto-generate PR descriptions
│   ├── create-rails-model.prompt.md     # ❸ Scaffold Rails models
│   └── code-review.prompt.md            # ❸ Code review
├── agents/
│   ├── front-reviewer.agent.md          # ❹ Frontend review specialist
│   ├── rails-api.agent.md               # ❹ Rails API design & implementation
│   └── aws-advisor.agent.md             # ❹ AWS infrastructure consulting
└── skills/
    ├── anti-slop/SKILL.md               # ❺ Detect and fix low-quality AI output
    └── design-taste-frontend/SKILL.md   # ❺ Avoid common LLM UI biases
```

## How Each File Works

### ❶ `copilot-instructions.md` (Always Auto-Applied)

Loaded automatically every time you open Copilot Chat. This is your project-wide baseline.

**This has the biggest impact — start here.**

What to include:

- Role definition (e.g., "Act as a senior engineer")
- Coding conventions (e.g., no `any`, naming rules)
- Behavioral guardrails (e.g., "Don't implement unrequested features")
- Git commit rules (e.g., Conventional Commits)

> **💡 Tip**: Keep it short. This file is loaded into context on every chat, so bloating it dilutes attention on your actual code. Start with 10–20 lines and split per-filetype details into ❷.

### ❷ `*.instructions.md` (Auto-Applied by File Path)

Layered on top of ❶ based on the `applyTo` glob in the YAML frontmatter:

```yaml
---
applyTo: "src/components/**,*.tsx,*.jsx"
---
```

When you edit `src/components/UserCard.tsx`, both `copilot-instructions.md` (global) and `frontend.instructions.md` (matched by `*.tsx`) are loaded. General rules first, then specifics.

| File | Applies To | Content |
|------|-----------|---------|
| `frontend.instructions.md` | `src/components/**`, `*.tsx`, etc. | React / Tailwind rules |
| `backend.instructions.md` | `app/**`, `*.rb`, etc. | Rails naming & design rules |
| `docs.instructions.md` | `docs/**`, `*.md`, etc. | Markdown style & terminology |

### ❸ `*.prompt.md` (Manual via `/`)

Reusable task templates that show up when you type `/` in Copilot Chat. Input variables (`${input:name}`) prompt for values at runtime.

| File | Invoke With | What It Does |
|------|------------|-------------|
| `create-component.prompt.md` | `/create-component` | Generate React component + Props types |
| `generate-test.prompt.md` | `/generate-test` | Generate tests for a target file |
| `pr-description.prompt.md` | `/pr-description` | Generate PR description from git diff |
| `create-rails-model.prompt.md` | `/create-rails-model` | Scaffold Model + Migration + RSpec |
| `code-review.prompt.md` | `/code-review` | Review a specified file |

### ❹ `*.agent.md` (Agent Picker)

Custom agents with a defined persona and toolset, selectable from the mode dropdown in chat. Define `name`, `description`, and `tools` in the YAML frontmatter, then write a system prompt in the body.

| File | Expertise |
|------|----------|
| `front-reviewer.agent.md` | React/TypeScript code review (5-point checklist) |
| `rails-api.agent.md` | Rails API design & implementation |
| `aws-advisor.agent.md` | AWS architecture consulting & CDK code generation |

### ❺ `SKILL.md` (Auto by Keyword or `/`)

Automatically loaded when chat content matches the `description` field, or invoked manually via `/skill-name`.

- Project-specific → place in `.github/skills/`
- Machine-wide → place in `~/.agents/skills/`
- Community skills → install with `npx skill add <skill-name>`

Browse available skills at [github/awesome-copilot](https://github.com/github/awesome-copilot).

## Tips

1. **Start small** — Even 3 lines in `copilot-instructions.md` make a difference
2. **Grow it** — Every time you manually fix Copilot's output, add that rule
3. **Layer rules** — Global rules (❶) + per-filetype rules (❷) stack naturally
4. **Add guardrails** — "Don't implement unrequested features" and "Don't refactor unless asked" are essential
5. **Share with your team** — Commit `.github/` and every `git clone` picks it up

## Example Stack (in This Template)

This template uses the following stack as an example, but you can adapt it to any technology:

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Ruby on Rails
- **Infrastructure**: AWS CDK (TypeScript)

## References

- [Customize AI in VS Code (official overview)](https://code.visualstudio.com/docs/copilot/customization/overview)
- [Custom Instructions (copilot-instructions.md / .instructions.md)](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Prompt Files (.prompt.md)](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Custom Agents (.agent.md)](https://code.visualstudio.com/docs/copilot/customization/custom-agents)
- [Agent Skills (SKILL.md)](https://code.visualstudio.com/docs/copilot/customization/agent-skills)
- [Agent Skills Spec (agentskills.io)](https://agentskills.io/)
- [Community skills & agents (github/awesome-copilot)](https://github.com/github/awesome-copilot)
