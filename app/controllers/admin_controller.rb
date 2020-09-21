class AdminController < ApplicationController
  def index
    authorize! :write, Space
    
    spaces = Space.with_role(:admin, current_user).uniq.order('name').pluck(:id, :name, :library_id)
    space_ids = spaces.collect{|a| a.first}
    
    @space_groups = spaces.group_by{|space| space[2].nil? ? "No Building" : Library.find(space[2]).name }
    @tips_review_count = Tip.where(space_id: space_ids, response: nil).count
    @disable_back_button = true
  end
  
  def login
    if can? :write, Space then
      redirect_to admin_path
    end
  end
end
