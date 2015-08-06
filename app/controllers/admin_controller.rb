class AdminController < ApplicationController
  def index
    @spaces = Space.order('name').pluck(:id, :name)
  end
end
