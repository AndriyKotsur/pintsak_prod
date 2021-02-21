import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as DeleteTileActions from 'actions/delete-tile.action'
import { Icon } from 'components'
import s from './style.module.scss'

const Tiles = ({ tiles, settings }) => {
	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.deleteTile)

	const deleteTile = async id => {
		dispatch(DeleteTileActions.deleteTile(id))
	}

	useEffect(() => {
		if(state.delete_tile_status === 'success')
			window.location = '/admin/dashboard'
	}, [state])

	return (
		<ul className={s.list}>
			{tiles && tiles.map(tile => (
				<li key={tile.id} className={s.item}>
					<Link to={`/tiles/${tile.id}`} className={s.link}>
						<h3 className={s.title}>{tile.title}</h3>
						<div className={s.wrapper}>
							<picture className={s.image}>
								<img src={tile.images[0]} alt={tile.title} />
							</picture>
						</div>
						<span className={s.size}>
							{tile.width} x {tile.height}
						</span>
						<span className={s.price}>
							{tile.color_price.grey}
						</span>
					</Link>
					{
						settings && settings.edit ?
							<div className={s.action}>
								<button
									onClick={() => history.push(`/admin/edit/tile/${tile.id}`)}
									className={s.edit}>
										Редагувати
								</button>
								<button
									onClick={() => {deleteTile(tile.id)}}
									className={s.delete}>
										Видалити
								</button>
							</div>
							:
							<div className={s.counter}>
								<button className={s.remove}>
									<Icon name='minus' className='icon icon-minus' />
								</button>
								<input type="number" className={s.count} min="1" value="1" />
								<button className={s.add}>
									<Icon name='plus' className='icon icon-plus' />
								</button>
								<button className={s.cart}>
									<Icon name='cart' className='icon icon-cart' />
								</button>
							</div>
					}
				</li>
			))}
		</ul>
	)
}

export default Tiles