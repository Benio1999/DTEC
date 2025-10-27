import './ListaSuspensa.css'

export function ListaSuspensa({itens, ...rest}) {
    return (
        <select defaultValue="" className='lista-suspensa-form' {...rest}>
            <option disabled value=''>Selecione uma opção</option>
            {itens.map(function (item) {
                return (
                    <option key={item.id} value={item.id}>
                        {item.nome}
                    </option>
                )
            }
            )}
        </select>
    )
}