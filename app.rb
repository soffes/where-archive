require 'sinatra'
require 'sinatra/content_for'
require 'json'
require 'date'

class Application < Sinatra::Base
  helpers Sinatra::ContentFor

  get '/' do
    erb :index
  end

  get '/points.json' do
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

  get '/route.json' do
    content_type :json

    {
      type: 'FeatureCollection',
      features: [route]
    }.to_json
  end

  private

  def route
    json = JSON.load(File.read('test.json'))
    locations = json['M'][0]['A'].map { |a| a['Locations'] }.flatten
    minimum_time = DateTime.parse('2019-07-12').to_time
    points = locations.filter { |l| DateTime.parse(l['D']).to_time > minimum_time }.map { |l| { latitude: l['L'], longitude: l['N'] } }
    route = {
      type: 'LineString',
      coordinates: points.map { |point| [point[:longitude], point[:latitude]] }
    }

    {
      type: 'Feature',
      id: 'route',
      geometry: route,
      properties: {}
    }
  end
end
