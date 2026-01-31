import CompSection from './CompSection'
import { motion } from 'framer-motion'
import Subtitle from './Subtitle'
import { useEffect, useState } from 'react'
import projectsService from '../services/projects.service'
import { useParams } from 'react-router-dom'
import i18n from '../js/i18n'

export default function ProjectDetail()
{
    const { id } = useParams()
    const [project, setProject] = useState()
    const lang = i18n.language || 'es'

    useEffect(() => {
        projectsService.getById(id)
        .then(data => {
            setProject(data)
            console.log("La data que viene es", data)
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
                                        <Subtitle subtitle={section.label?.[lang]} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl lg:text-4xl mb-5">{section.title?.[lang]}</h2>
                                        <p>{section.content}</p>
                                    </div>
                                </motion.div>
                        ))}
                    </div>
                )
            }

            <div className="xl:flex xl:items-start">
                <div className="xl:mr-4">
                    <Subtitle subtitle="Marca" />
                </div>
                <div>
                    <h1 className="text-2xl lg:text-4xl mb-5">Donde empieza la identidad</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
            <div className="flex">
                <div className="xl:mr-4">
                    <Subtitle subtitle="Isologo" />
                </div>
                <div>
                    <h2>Cuando la marca se vuelve forma</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
            <div className="flex">
                <div className="xl:mr-4">
                    <Subtitle subtitle="Color" />
                </div>
                <div>
                    <h2>Donde la emoción toma color</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
        </CompSection>
    )

}