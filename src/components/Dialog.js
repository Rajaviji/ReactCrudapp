// import { AnimatePresence, motion } from "framer-motion"
// import { wrapAnim, wrapPopAnim } from "../commons/anims"
// import { IoMdClose } from "react-icons/io"

// const Dialog = ({ children, showDialog, title, onClose, injectClass='' }) => {

//     const close = () => {
//         if(typeof onClose === 'function') onClose()
//     }

//     return (
//         <AnimatePresence>
//             {showDialog &&
//                 <motion.div variants={wrapAnim} initial="hidden" animate="visible" exit="hidden" className="flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-black text-gray-700 dark:text-white bg-opacity-60 z-[900]">
//                     <motion.div variants={wrapPopAnim} className={`bg-bluegray-200 dark:bg-ldark px-4 pt-2 pb-4 min-w-[500px] rounded-lg shadow-xl flex flex-col max-h-[90vh] ${injectClass}`}>
//                         <div className="flex justify-between items-center">
//                             <span className="text-lg font-medium text-tcolor dark:text-white">
//                                 {title}
//                             </span>
//                             <IoMdClose size="20px" className="cursor-pointer" onClick={close} />
//                         </div>
//                         <div className="flex mt-4 w-full overflow-auto">
//                             {children}
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             }
//         </AnimatePresence>
//     )
// }

// export default Dialog