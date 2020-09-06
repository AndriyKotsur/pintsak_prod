import React, { useState, useEffect } from 'react'
import useEditType from './edit-type.logic'

const EditType = () => {
  const { type, updateType } = useEditType()
  const [typeTitle, setTypeTitle] = useState('')
  const [typeUrl, setTypeUrl] = useState('')

  useEffect(() => {
    if (type) {
      setTypeTitle(type.title)
      setTypeUrl(type.url)
    }
  }, [type])

  return (
    <>
      {type && (
        <div className="contact-us">
          <div className="container">
            <div className="contact-us-inner">
              <h2 className="contact-us__title">
                Редагувати категорію
              </h2>
              <form onSubmit={(e) => updateType(e, typeTitle, typeUrl.toLowerCase())} className="form contact-us-form">
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="title"
                    className="input contact-us__input"
                    value={typeTitle}
                    onChange={(e) => setTypeTitle(e.target.value)}
                    required
                  />
                  <label className="label contact-us__label">Назва категорії</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="title_url"
                    className="input contact-us__input"
                    value={typeUrl}
                    onChange={(e) => setTypeUrl(e.target.value)}
                    required
                  />
                  <label className="label contact-us__label">Назва категорії (англ.)</label>
                </div>
                <p className="contact-us__required">обов’язкові поля</p>
                <button className="contact-us__btn">Пітвердити</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditType