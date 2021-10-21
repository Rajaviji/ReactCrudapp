import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { TextAnimateX, TextAnimateY } from '../commons/anims'

const FlowText = ({text,childrenStager=0.08,direction='y',force=false})=>{
        
    const animate = useSelector (state =>state.theme.animate)

    const wrapAnim ={
        hidden: {
            opacity : 0
        },
        visible: {
            opacity : 1,
            transition : {
                when : 'beforeChildren',
                staggerChildren : childrenStager,
            }
        }
    }
    
    return(
        <motion.span variants={animate || force ? wrapAnim :''} intial={"hidden"} animate="visible">
            {
                text?.split('').map((c,i)=>{
                    return <motion.span key={i} className="inline-block" variants={!animate && !force ? "" : direction === 'x' ? TextAnimateX : TextAnimateY}>{c === ' ' ? '\u00A0' : c}</motion.span>
                })
            }
        </motion.span>
    )
}

export default FlowText