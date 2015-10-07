# Homepage (Root path)
get '/' do
  @contacts = Contact.all
  erb :index
end

post '/api/new_contact' do
  new_contact = Contact.create(
                  first_name: params["firstName"],
                  last_name: params["lastName"],
                  email: params["email"],
                  phone_number: params["phoneNumber"]
                )
  new_contact.to_json
end

put '/api/update/:id' do |id|
  contact = Contact.find(id);
  contact.update_attributes(first_name: params["firstName"], last_name: params["lastName"], email: params["email"], phone_number: params["phoneNumber"])
  contact.to_json
end

put '/api/delete/:id' do |id|
  contact = Contact.find(id);
  contact.destroy
end