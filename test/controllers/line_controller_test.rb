require 'test_helper'

class LineControllerTest < ActionController::TestCase
  test "should get show" do
    get :show
    assert_response :success
  end

end
