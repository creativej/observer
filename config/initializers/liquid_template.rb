class GroupTag < Liquid::Tag
  def initialize(tag_name, content, tokens)
    super
    @name = content.sub(/by (.+)$/, '').strip
    @period = content.sub(/^(.+) by/, '').strip
  end

  def render(context)
    year = "YEAR(FROM_UNIXTIME(#{@name}))"
    month = "MONTH(FROM_UNIXTIME(#{@name}))"
    day = "DAY(FROM_UNIXTIME(#{@name}))"
    hour = "HOUR(FROM_UNIXTIME(#{@name}))"

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

class RangeTag < Liquid::Tag
  def render(context)
    filter = ' '
    if @start_date.present?
      filter += "#{@timestamp} > #{@start_date}"
    end
    if @end_date.present?
      if @start_date.present?
        filter += ' AND '
      end

      filter += "#{@timestamp} <= #{@end_date} "
    end
    filter
  end
end

Liquid::Template.register_tag('group', GroupTag)
