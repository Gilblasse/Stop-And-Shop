class ItemsController < ApplicationController

    def index
        items = Item.all
        render json: items
    end

    # def show
    #     item = Item.find(params[:id])
    #     render json: ItemSerializer.new(item,item_options_hash)
    # end




    # private

    # def item_options_hash
    #     {
    #         include: [:'cart_items']
    #     }
    # end

end
