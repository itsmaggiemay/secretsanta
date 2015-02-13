task :update_profile => :environment do
  def update_profile(email,password,ga_id)
    agent = Mechanize.new
    page = agent.get('https://accounts.generalassemb.ly/users/sign_in')
    page.form['user[email]'] = email
    page.form['user[password]'] = password
    title1 = page.title
    page = agent.submit(page.form, page.form.buttons.first)
    puts title1 == page.title ? "LOG IN FAILED" : "LOG IN SUCCESSFUL"
    page = agent.get('https://profiles.generalassemb.ly/profiles/' + ga_id + '/steps/the_lead')
    puts page.title
    page = agent.submit(page.forms[0], page.forms[0].buttons[0])
    puts page.title
    page.links[0].click
  end
  update_profile(ENV['GA_USERNAME'],ENV['GA_PASSWORD'],'1067')
end