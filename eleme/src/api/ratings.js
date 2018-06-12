
import jsonp from 'api/jsonp'
import { commonParams, options } from 'api/config'
export function getRatings () {
  const url = 'https://h5.ele.me/restapi/ugc/v3/restaurants/257474/ratings'
  const data = Object.assign({}, commonParams, {
    has_content: 'true',
    offset: 0,
    limit: 8
  })
  return jsonp(url, data)
}

export function shopDetail () {
  const url = 'https://h5.ele.me/restapi/shopping/restaurant/257474?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification'
  const data = Object.assign({}, commonParams, {
    terminal: 'h5',
    latitude: 39.73175,
    longitude: 116.33448
  })
  return jsonp(url, data)
}
