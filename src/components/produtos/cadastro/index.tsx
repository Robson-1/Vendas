import { useState } from 'react'
import { Layout, Input, Message } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal } from 'app/util/money'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import Link from 'next/link'

const msgcampoObrigatorio = 'Campo obrigatório'

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgcampoObrigatorio),
    descricao: yup.string().trim().required(msgcampoObrigatorio),
    preco: yup.number().required(msgcampoObrigatorio).moreThan(0, 'Valor tem que ser maior que zero (0,00)'),
    nome: yup.string().trim().required(msgcampoObrigatorio)
})

interface FormErrors {
    sku?: string
    descricao?: string
    preco?: string
    nome?: string
}

export const CadastroProdutos: React.FC = () => {

    const service = useProdutoService()
    const [sku, setSku] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [cadastro, setCadastro] = useState<string>('')
    const [messages, setMessages] = useState<Array<Alert>>([])
    const [errors, setErrors] = useState<FormErrors>({})

    const submit = () => {
        const produto: Produto = {
            id,
            sku,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }

        validationSchema.validate(produto).then(obj => {
            setErrors({})
            if (id) {
                service
                    .atualizar(produto)
                    .then(response => {
                        setMessages([{
                            tipo: 'success', texto: 'Produto atualizado com sucesso!'
                        }])
                    })
            } else {

                service
                    .salvar(produto)
                    .then(produtoResposta => {
                        setId(produtoResposta.id)
                        setCadastro(produtoResposta.cadastro)
                        setMessages([{
                            tipo: 'success', texto: 'Produto Salvo com sucesso!'
                        }])
                    })
            }

        }).catch(err => {
            const field = err.path
            const message = err.message

            setErrors({
                [field]: message
            })
        })


    }

    return (
        <Layout titulo="Produtos" mensagens={messages}>

            {id &&
                <div className="columns">
                    <Input label="Código:"
                        columnClasses="is-half"
                        value={id}
                        id="inputId"
                        disabled={true}
                    />

                    <Input label="Data Cadastro:"
                        columnClasses="is-half"
                        value={cadastro}
                        id="inputDataCadastro"
                        disabled
                    />
                </div>
            }

            <div className="columns">
                <Input label="SKU: *"
                    columnClasses="is-half"
                    onChange={setSku}
                    value={sku}
                    id="inputSku"
                    placeholder="Digite o SKU do produto"
                    error={errors.sku}

                />

                <Input label="Preço: *"
                    columnClasses="is-half"
                    onChange={setPreco}
                    value={preco}
                    id="inputPreco"
                    placeholder="Digite o Preço do produto"
                    maxLength={16}
                    currency
                    error={errors.preco}
                />
            </div>

            <div className="columns">
                <Input label="Nome: *"
                    columnClasses="is-full"
                    onChange={setNome}
                    value={nome}
                    id="inputNome"
                    placeholder="Digite o Nome do produto"
                    error={errors.nome}
                />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea"
                            id="inputDesc" value={descricao}
                            onChange={event => setDescricao(event.target.value)}
                            placeholder="Digite a Descrição detalhada do produto"
                        />
                        {errors.descricao &&
                            <p className='help is-danger' > {errors.descricao} </p>
                        }

                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control is-link">
                    <button onClick={submit} className="button">
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className="control">
                    <Link href="/consultas/produtos">
                        <button className="button">Voltar</button>
                    </Link>
                    
                </div>
            </div>

        </Layout>
    )
}