class GroupTag < Liquid::Tag
  def initialize(tag_name, content, tokens)
    super
    @name = content.sub(/by (.+)$/, '').strip
    @period = content.sub(/^(.+) by/, '').strip
  end

  def render(context)
    date = "FROM_UNIXTIME(#{@name})"

    year = "YEAR(#{date})"
    month = "MONTH(#{date})"
    day = "DAY(#{date})"
    hour = "HOUR(#{date})"

    vars = context.environments.first

    if vars.has_key?('group_by')
      @period = vars['group_by']
    end
    @period = @period.downcase

    if @period == 'year'
      return year
    elsif @period == 'month'
      return "CONCAT(#{year}, '-', #{month})"
    elsif @period == 'day'
      return "CONCAT(#{year}, '-', #{month}, '-', #{day})"
    elsif @period == 'hour'
      return "CONCAT(#{year}, '-', #{month}, '-', #{day}, '-', #{hour})"
    end
  end
end
