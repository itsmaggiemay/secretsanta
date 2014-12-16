class Wishlist < ActiveRecord::Base

validates :title, presence: true

belongs_to :user
has_many :gifts

end
