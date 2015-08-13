class AdminController < ApplicationController
  def index
    @spaces = Space.order('name').pluck(:id, :name)
    @tips_review_count = Tip.count(:response)
    @disable_back_button = true
  end
end
