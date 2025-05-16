import TField from '~/js/controllers/form/type/TField';

type TForm = {
    attrs: {
        [name: string]: string
    }
    options: {
        [name: string]: any
    }
    fields: {
        [name: string]: TField
    }
}

export default TForm;

