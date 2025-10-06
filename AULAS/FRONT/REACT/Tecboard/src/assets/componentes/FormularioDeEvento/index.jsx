import '../FormularioDeEvento/FormularioDeEvento.css'
import { Botao } from '../Botão';
import { CampoDeEntrada } from '../CampoDeEntrada';
import { CampoDeFormulario } from '../CampoDeFormulario';
import { Label } from "../Label";
import { ListaSuspensa } from '../ListaSuspensa';
import { TituloFormulario } from "../TituloFormulario";

export function FormularioDeEvento() {
    return (
        <form className='form-evento'>
            <TituloFormulario> Preencha para criar um evento: </TituloFormulario>

            <div className='campos'>
                <CampoDeFormulario>
                    <Label htmlFor="nome">Qual é o nome do evento: </Label>
                    <CampoDeEntrada type="text" id="nome" placeholder='Sumer dev hits' />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor="dataEvento">Qual é a data do evento: </Label>
                    <CampoDeEntrada type="date" id="nome" placeholder='Data do Evento' />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor="dataEvento">Qual é o tipo do evento: </Label>
                    <ListaSuspensa />
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