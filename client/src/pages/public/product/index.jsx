import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTileActions from 'actions/get-tile.action'

import { Icon, Preloader, Counter, Carousel, Cart } from 'components'
import Breadcrumbs from './components/breadcrumbs'
import Gallery from './components/gallery'
import Table from './components/table'

import classNames from 'classnames'
import s from './style.module.scss'

const ProductPage = () => {
	const [cart, setCart] = useState(false)
	const dispatch = useDispatch()
	const { url } = useParams()

	const tile = useSelector(tile => tile.getTile)

	useEffect(() => {
		dispatch(GetTileActions.getTile(url))
	}, [])

	return (
		<div className={s.section}>
			{tile.get_tile_status === 'loading' && <Preloader/>}
			{tile.get_tile_status === 'success' && tile.get_tile_status && (
				<div className="container">
					<div className={s.wrapper}>
						<Link to="" className={s.back}>
							<Icon name='arrow' className={classNames('icon', 'icon-back', s.back)}/>
							{tile.title}
						</Link>
						<Breadcrumbs type={tile.type} tile={tile.title}/>
						<div className={s.product}>
							<span
								className={classNames(s.status, { [s.available]: tile.is_available })}>{tile.is_available ? 'В наявності' : 'Нема у наявності'}</span>
							<Gallery images={tile.images}/>
							<div className={s.product_block}>
								<div className={s.product_wrapper}>
									<h1 className={s.product_title}>{tile.title}</h1>
									<p className={s.product_price}>{tile.prices.grey},<sup> 00 грн</sup></p>
									<Counter />
									<button onClick={() => setCart(prev => !prev)}
										className={classNames('btn-green', 'btn-cart', s.product_btn)}>
										<Icon name='cart' className={classNames('icon', 'icon-cart', s.product_icon)}/>
                                        В кошик
									</button>
								</div>
							</div>
						</div>
						<Table options={tile.sizes}/>
						<Carousel items={tile.tiles} styleName={s.carousel}/>
					</div>
				</div>
			)}
			{cart && <Cart/>}
		</div>
	)
}

export default ProductPage
