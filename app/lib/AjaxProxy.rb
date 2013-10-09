require 'HTTParty';

class AjaxProxy
  include HTTParty

  def get(url)
    self.class.get(url)
  end
end
