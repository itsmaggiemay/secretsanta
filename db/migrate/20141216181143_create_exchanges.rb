class CreateExchanges < ActiveRecord::Migration
  def change
    create_table :exchanges do |t|
    	t.string	:exchange_name, presence: true
    	t.string	:exchange_date, presence: true
    	t.integer :budget, presence: true

    	t.timestamps
    end
  end
end
