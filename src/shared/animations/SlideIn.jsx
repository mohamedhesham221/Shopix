"use client;";
import * as React from "react";
import { motion, useInView } from "framer-motion";

const SlideIn = ({ children, index, isOnce = true }) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, {
		once: isOnce,
		margin: "-50px",
		amount: 0.5,
	});
	return (
		<>
			<motion.div
				ref={ref}
				initial={{ x: 50, opacity: 0 }}
				animate={isInView ? { x: 0, opacity: 1 } : {}}
				transition={{ duration: 0.3, delay: index * 0.1 }}
			>
				{children}
			</motion.div>
		</>
	);
};

export default SlideIn;
