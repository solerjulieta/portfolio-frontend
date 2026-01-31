import CompSection from './CompSection'
import { motion } from 'framer-motion'
import Subtitle from './Subtitle'
import { useEffect, useState } from 'react'
import projectsService from '../services/projects.service'
import { useParams } from 'react-router-dom'
import i18n from '../js/i18n'
import ReactMarkDown from 'react-markdown'

export default function ProjectDetail()
{
    const { id } = useParams()
    const [project, setProject] = useState()
    const lang = i18n.language || 'es'

    useEffect(() => {
        projectsService.getById(id)
        .then(data => {
            setProject(data)
            console.log("El subtitulo es", data.caseStudy.subtitle[lang])
        })
    }, [id])

    return(
        <CompSection className="mt-20">
            <motion.h1
                className="text-2xl lg:text-4xl mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {project?.title}
            </motion.h1>
            {project?.caseStudy?.enabled && 
                Array.isArray(project.caseStudy.sections) && (
                    <div className="space-y-16">
                        {project.caseStudy.sections
                        .sort((a, b) => a.order - b.order)
                        .map((section, index) => (
                            <motion.div
                                className="xl:flex xl:items-start"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="xl:mr-4">
                                    <Subtitle subtitle={section.subtitle?.[lang]} />
                                </div>
                                <div>
                                    <h2 className="text-2xl lg:text-4xl mb-6">{section.title?.[lang]}</h2>
                                    <ReactMarkDown 
                                    components={{
                                        p: ({ children }) => (
                                            <p className="text-txtGrey lg:text-lg mb-4 leading-relaxed">
                                                {children}
                                            </p>
                                        ),
                                        strong: ({ children }) => (
                                            <span className="font-bold text-mainViolet">
                                                {children}
                                            </span>
                                        )
                                    }}
                                    >
                                        {section.body?.[lang]}
                                    </ReactMarkDown>
                                    <p>{section.content}</p>
                                    {Array.isArray(section.media) && section.media.length > 0 && (
                                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {section.media.map((item, i) => {
                                                if(item.type === "image"){
                                                    return(
                                                        <motion.img 
                                                            key={i}
                                                            src={`/img/projects/${item.src}`}
                                                            alt={item.alt}
                                                            loading="lazy"
                                                            className="w-full rounded-2xl shadow-lg object-cover"
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.4 }}
                                                        />
                                                    )
                                                }
                                                return null
                                            })}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )
            }
        </CompSection>
    )

}