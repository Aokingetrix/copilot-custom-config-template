module Players
  class Login
    def self.call(player:)
      player.update!(last_login_at: Time.current)
      player
    end
  end
end
