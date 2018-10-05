import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getHotels } from '@Actions'
import { List } from 'react-virtualized'

// import InfiniteScroll from 'react-infinite-scroller'

const listHeight = 600
const rowHeight = 120
const rowWidth = 800

class App extends Component {
  constructor (props) {
    super()
    this.renderRow = this.renderRow.bind(this)
  }

  componentWillMount () {
    this.props.getHotels()
  }

  renderStars (stars) {
    let star = []
    for (let i = 1; i <= stars; i++) {
      star.push(<i key={i} />)
    }
    return star
  }

  reviewScore (score) {
    if (score === 0 && score <= 67) {
      return 'poor'
    } else if (score > 67 && score <= 74) {
      return 'fair'
    } else if (score > 74 && score <= 79) {
      return 'good'
    } else if (score > 79 || score <= 85) {
      return 'very good'
    } else {
      return 'excellent'
    }
  }

  renderRow ({ index, key, style }) {
    const { image, name, stars, district, distanceToCityCentre, review, amount } = this.props.hotels[index]
    return (
      <div key={key} style={style} className='hotel'>
        <div className='hotel-image'>
          <img src={image} />
        </div>
        <div className='hotel-info'>
          <div className='hotel-name'>{name}</div>
          <div className='hotel-meta'>
            <div className='hotel-rating'>{this.renderStars(stars)}</div>
            <div className='hotel-district'>{district}</div>
          </div>
          <div className='hotel-distance'>{ (distanceToCityCentre / 10).toFixed(2) } km to city centre</div>
          <div className='hotel-review'>
            <div className={'hotel-score ' + this.reviewScore(review.score)}>{review.score}</div>
            <div className='hotel-score-ref'>Fair <span>{review.reviewsCount} Reviews</span></div>
            <div className='hotel-amount'><sup>S$</sup>{amount}</div>
          </div>
        </div>
      </div>
    )
  }

  renderListing () {
    const { hotels } = this.props

    if (hotels) {
      const list = this.props.hotels.map((val, idx) => {
        return {
          id: idx,
          name: val.name,
          image: val.image,
          stars: val.stars,
          district: val.district,
          distanceToCityCentre: val.distanceToCityCentre,
          amount: val.amount
        }
      })

      return (
        <List
          width={rowWidth}
          height={listHeight}
          rowHeight={rowHeight}
          rowRenderer={this.renderRow}
          rowCount={list.length} />
      )
    } else {
      return (
        <div>Test</div>
      )
    }
  }

  render () {
    return (
      <div>
        <div className='hotels-listing'>{this.renderListing()}</div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    hotels: state.hotels.hotels
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getHotels
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
