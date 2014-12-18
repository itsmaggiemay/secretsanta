class Friend < ActiveRecord::Base
	
	validates_presence_of :firstName
	validates_presence_of :lastName
	validates_presence_of :email
	
end