class UsersController < ApplicationController
    before_action :user_params, only: [:create]
    
    def index
        users = User.all
        render json: UserSerializer.new(users)

    end

    def show
        user = User.find_by(id: params[:id])
        if user 
            render json: UserSerializer.new(user,user_options_hash)
        else
            render json: {error: user}
        end
    end

    def create
        user = User.find_by(email: user_params[:email])
        if user
            if user.authenticate(user_params[:password])
                render json: UserSerializer.new(user,user_options_hash)
            else  
                render json: {error: "Username or Password Incorrect"}
            end
        else
            if user_params.values.any?{|v| v.blank?}
                render json: {error: "Username or Password Can't Be Blank"}
            else
                user = User.create(user_params)

                render json: UserSerializer.new(user,user_options_hash)
            end
        end
        # binding.pry
    end
    


    private
    
    def user_params
        params.require(:user).permit(:email,:password)
    end

    def user_options_hash
        options = {}
        options[:include] = [:carts, :'carts.items']
        options
    end

end
