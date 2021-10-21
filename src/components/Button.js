import React from 'react'

const Button = ({ children, injectClass, onClick, loading }) => {

    return (
        <div className={ injectClass }>
            <button type="button" className={`relative bg-gradient-to-tr from-tcolor to-blue-300 text-lg text-white px-16 py-2 rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-200 dark:hover:ring-offset-ldark hover:ring-tcolor hover:shadow-xl transition-all duration-300 align-middle outline-none focus:outline-none ${ loading ? 'opacity-50' : ''}`} onClick={ () => onClick ? onClick() : null }>
                { children }
            </button>
        </div>
    )
}

export default Button
