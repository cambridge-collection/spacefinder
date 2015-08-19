class AdminController < ApplicationController
  def index
    spaces = Space.order('name').pluck(:id, :name, :library_id)
    @space_groups = spaces.group_by{|space| space[2].nil? ? "No Building" : Library.find(space[2]).name }
    @tips_review_count = Tip.count - Tip.count(:response)
    @disable_back_button = true
    authorize! :manage, Space
  end
  
  def login
  end
end
