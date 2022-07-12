import { useState } from 'react'
import { Layout, Input } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'




export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDesc] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [cadastro, setCadastro] = useState<string>('')


    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: parseFloat(preco),
            nome,
            descricao,
            cadastro

        }
        service
            .salvar(produto)
            .then(produtoResposta => {
                setId(produtoResposta.id)
                setCadastro(produtoResposta.cadastro)
            })
    }

    return (

        <Layout titulo='Cadastro de Produtos'>
            { id &&

                <div className="columns">

                    <Input label="Código: *"
                        columnClasses='is-half'
                        value={id}
                        id="inputId"
                        disabled={true}
                    />

                    <Input label="Data Cadastro: *"
                        columnClasses='is-half'
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled={true}
                    />
                </div>
            }

            <div className="columns">
                <Input label="SKU: *"
                    columnClasses='is-half'
                    onChange={setSku}
                    value={sku}
                    id="inputSku"
                    placeholder="Digite o SKU do produto" />

                <Input label="Preço: *"
                    columnClasses='is-half'
                    onChange={setPreco}
                    value={preco}
                    id="inputPreco"
                    placeholder="Digite o preço do produto" />

            </div>

            <div className="columns">
                <Input label="Nome: *"
                    columnClasses='is-full'
                    onChange={setNome}
                    value={nome}
                    id="inputNome"
                    placeholder="Digite o nome do produto" />

            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor='inputDesc'>Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea"
                            id="inputDesc"
                            value={descricao}
                            onChange={e => setDesc(e.target.value)}
                            placeholder="Digite a Descrição detalhada do produto" />
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link"
                        onClick={submit}>
                        Salvar
                    </button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>
        </Layout>

    )
}