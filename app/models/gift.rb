class Gift < ActiveRecord::Base

	validates :name, presence: true
	validates :description, presence: true
	validates :url, presence: true
	
	belongs_to :wishlist
end
