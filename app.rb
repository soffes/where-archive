require 'sinatra'
require 'sinatra/content_for'
require 'json'

class Application < Sinatra::Base
  helpers Sinatra::ContentFor

  get '/' do
    erb :index
  end

  get '/data.json' do
    content_type :json

    {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [-121.546596, 37.186381]
          }
        }
      ]
    }.to_json
  end
end
