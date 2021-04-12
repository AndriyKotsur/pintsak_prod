import React, {useRef} from "react"
import {Splide, SplideSlide} from "@splidejs/react-splide"
import {Icon, Tile} from "components"

import classNames from "classnames"
import s from "./style.module.scss"

const Carousel = ({items, styleName}) => {
    const carouselRef = useRef(null)

    const carousel = {
        arrowPath: 'M7.2541 0.683838L14.7785 6.68384H14.7785H14.7787V6.68394L15.988 7.68384L14.7787 8.68374V8.68384L14.7785 8.68384L14.7785 8.68384L7.1883 14.5552L6.64992 12.7526L11.9098 8.68384H0.0496826V6.68384H12.142L6.71572 2.48642L7.2541 0.683838Z',
        classes: {
            arrows: s.controls,
            prev  : `splide__arrow--prev ${s.step}`,
            next  : `splide__arrow--prev ${s.step}`,
        },
        type: 'loop',
        perPage: 3,
        perMove: 1,
        arrows: true,
        pagination: false,
        breakpoints: {
            1024: {
                width: 325,
                perPage: 3,
            },
            767: {
                width: 260,
            },
        },
    }

    return (
        <div className={styleName}>
            <div className={s.header}>
                <h2 className={s.title}>Популярні товари</h2>
            </div>
            <ul className={s.list}>
                <Splide options={carousel} ref={carouselRef}>
                    {items && items.length > 0 && items.map(tile => (
                        <SplideSlide>
                            <Tile tile={tile} settings={{public: true}}/>
                        </SplideSlide>
                    ))}
                </Splide>
            </ul>
        </div>
    )
}

export default Carousel
