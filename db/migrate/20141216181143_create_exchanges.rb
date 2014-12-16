class CreateExchanges < ActiveRecord::Migration
  def change
    create_table :exchanges do |t|
    	t.string	:exchange_name
    	t.string	:exchange_date
    	t.integer :budget

    	t.timestamps
    end
  end
end
