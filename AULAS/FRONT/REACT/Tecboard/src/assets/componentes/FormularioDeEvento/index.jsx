import '../FormularioDeEvento/FormularioDeEvento.css'
import { Botao } from '../Botão';
import { CampoDeEntrada } from '../CampoDeEntrada';
import { CampoDeFormulario } from '../CampoDeFormulario';
import { Label } from "../Label";
import { ListaSuspensa } from '../ListaSuspensa';
import { TituloFormulario } from "../TituloFormulario";


export function FormularioDeEvento({ temas, aoSubmeter }) {

    function aoFormSubmetido(e) {
        e.preventDefault()
        const form = e.target
        const FormDataObj = new FormData(form)
        console.log('Está na hora de criar um evento', FormDataObj)
        const evento = {
            capa: FormDataObj.get('capa'),
            tema: temas.find(function (item) {
                return item.id == FormDataObj.get('tema')
            }),
            data: new Date(FormDataObj.get('dataEvento')),
            titulo: FormDataObj.get('nomeEvento')
        }
        aoSubmeter(evento)
    }

    return (
        <form className='form-evento' onSubmit={aoFormSubmetido}>
            <TituloFormulario> Preencha para criar um evento: </TituloFormulario>

            <div className='campos'>
                <CampoDeFormulario>
                    <Label htmlFor="nomeEvento">Qual é o nome do evento: </Label>
                    <CampoDeEntrada type="text" id="nomeEvento" name="nomeEvento" placeholder='Sumer dev hits' />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor="capa">Qual é o endereço da imagem de capa?</Label>
                    <CampoDeEntrada type="text" id="capa" placeholder='http://...' name='capa' />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor="dataEvento">Qual é a data do evento: </Label>
                    <CampoDeEntrada type="date" id="dataEvento" name="dataEvento" placeholder='Data do Evento' />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor="tema">Qual é o tipo do evento: </Label>
                    <ListaSuspensa id='tema' name='tema' itens={temas} />
                </CampoDeFormulario>
            </div>

            <div className='acoes'>
                <Botao>
                    Criar evento
                </Botao>
            </div>

        </form>
    )
}