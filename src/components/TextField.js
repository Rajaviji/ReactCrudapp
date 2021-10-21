import { FaCheck, FaExclamationTriangle, FaEye, FaEyeSlash, FaUpload } from 'react-icons/fa'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LabelAnim = {
    hidden: {
        y: -5,
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1
    }
}

const TextField = ({ AppendIcon, label, name, injectClass, initialValue, setValue, type, loading, formDirty, onEnter }) => {

    const [value, setInputValue] = useState({value: initialValue, dirty: false, valid: false, focus: false})
    const [showPassword, setShowPassword] = useState(false)

    const inputElem = useRef(null)

    const AppendIconElem = () => {
        if(loading) return <FaUpload className="pointer-events-none text-yellow-500 duration-1000 animate-ping text-xl mt-0.5" />
        else if(value.valid) return <FaCheck className="pointer-events-none text-green-500 text-xl mt-0.5" />
        else if(value.dirty && !value.focus) return <FaExclamationTriangle className="pointer-events-none text-red-500 text-xl mt-0.5" />
        return AppendIcon && AppendIcon !== '' ? <AppendIcon className="pointer-events-none text-xl mt-0.5" /> : null
    }
    const LabelElem = value.dirty && value.valid ? <motion.label variants={ LabelAnim } initial="hidden" animate="visible" exit="hidden" className="absolute left-9 bg-indigo-50 dark:bg-ldark text-md text-tcolor -top-1 z-10 px-1" htmlFor={ name }>{ label }</motion.label> : null

    const chgValue = (e) => {
        setInputValue({...value, value: e.target.value, dirty: true, valid: e.target.value && e.target.value !== '' ? true : false})
        setValue(e.target.value)
    }
    const setFocus = (val) => setInputValue({...value, focus: val})
    const focusInput = () => inputElem.current.focus()
    const keyPress = (e) => {
        if(e.key === 'Enter') {
            if(onEnter !== undefined) onEnter()
        }
    }
    const inputType = useMemo(() => {
        if (type === 'password') return showPassword ? 'text' : 'password'
        return type
    }, [type, showPassword])

    // if form is dirty mark field dirty
    useEffect(() => {
        setInputValue(value => ({...value, dirty: formDirty}))
    }, [formDirty])

    return (
        <div className={`relative flex flex-col py-0 px-6 text-gray-400 focus-within:text-tcolor ${injectClass}`}>
            <AnimatePresence>
                { LabelElem }
            </AnimatePresence>
            <div className={`focus-within:ring-tcolor ring-2 ring-gray-400 dark:ring-gray-300 rounded-lg py-3 px-4 mt-2 cursor-text flex content-center ${loading ? 'animate-pulse' : ''}`} onClick={ () => focusInput() }>
                <input ref={ inputElem } className={ `text-xl outline-none ${value.valid ? 'text-gray-600 dark:text-gray-200' : 'text-gray-400'} w-full bg-transparent` } type={ inputType } name={ name } placeholder={ label } value={ value.value } onChange={ chgValue } onFocus= { () => setFocus(true) } onBlur={ () => setFocus(false) }  disabled={ loading } onKeyPress={ keyPress } />
                <span className="flex items-center gap-3">
                    {type === 'password' && !showPassword && <FaEye className="text-gray-500 text-xl cursor-pointer ml-2" onClick={() => setShowPassword(true)} />}
                    {type === 'password' && showPassword && <FaEyeSlash className="text-gray-500 text-xl cursor-pointer ml-2" onClick={() => setShowPassword(false)} />}
                    <AppendIconElem />
                </span>
            </div>
        </div>
    )
}

export default TextField
