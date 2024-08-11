import EmailTemplate from "@models/EmailTemplate";


export const getOneTemplateById = async (templateId: string) => {
    const template = await EmailTemplate.findByPk(templateId);
    if (!template) {
        throw new Error('Template not found');
    }

    return template
}

export const getOneTemplateByName = async (templateName: string) => {
    const template = await EmailTemplate.findOne({
        where: { name: templateName }
    })
    if (!template) {
        throw new Error('Template not found');
    }

    return template;
}
