class Exchange < ActiveRecord::Base

validates :exchange_name
validates :exchange_date
validates :budget

has_many :users
end
