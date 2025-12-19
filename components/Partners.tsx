import { motion } from "framer-motion";

// Partner logos
import mastercardLogo from "../Assets/mastercard-logo.png";
import blackrockLogo from "../Assets/blackrock-logo.png";
import swarmLogo from "../Assets/swarm-logo.png";
import centrifugeLogo from "../Assets/centrifuge-logo.png";
import plumeLogo from "../Assets/plume-logo.png";

const logos = [
    { src: mastercardLogo, alt: "Mastercard" },
    { src: blackrockLogo, alt: "BlackRock" },
    { src: swarmLogo, alt: "Swarm" },
    { src: centrifugeLogo, alt: "Centrifuge" },
    { src: plumeLogo, alt: "Plume" },
];

export const Partners = () => {
    // Duplicate logos for seamless infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos];

    return (
        <section className="relative w-full py-20 bg-[#CFEDFF] snap-start overflow-hidden">
            {/* Title */}
            <div className="text-center mb-12">
                <h2 className="text-[32px] font-sans text-[#21445F] leading-none">
                    Our <span className="font-bold">Partners</span>
                </h2>
            </div>

            {/* Logo Marquee */}
            <div className="relative w-full overflow-hidden">
                <motion.div
                    className="flex items-center gap-20"
                    animate={{
                        x: [0, -1200],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {duplicatedLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[160px] h-[60px] flex items-center justify-center"
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="max-w-full max-h-full object-contain"
                                style={{
                                    filter: "brightness(0) saturate(100%) invert(22%) sepia(15%) saturate(1000%) hue-rotate(165deg) brightness(95%) contrast(90%)",
                                }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
