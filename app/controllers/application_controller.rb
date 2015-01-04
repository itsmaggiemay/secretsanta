class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def index
  	 render layout: 'application', text: '' 
  	 # instead of using yield, using layouts -- application.html.erb
  	 # send back an empty string from the layout
  	 # instead of looking for a view I will throw back some text
  	 #heres the layout do what you want with is, not sending anything else,
  	 # aka <%=yield%>
  end


end
