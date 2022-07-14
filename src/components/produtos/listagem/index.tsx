import { Layout, Loader} from "components"
import  Link  from 'next/link'
import { TabelaProdutos } from './tabela'
import { Produto } from "app/models/produtos" 
import swr from "swr"
import { httpClient } from "app/http"
import useSWR from "swr"
import { AxiosResponse } from "axios"

export const ListagemProdutos: React.FC = () => {
    
    const { data : result, error } = useSWR<AxiosResponse<Produto[]>>
                                    ('/api/produtos', url => httpClient.get(url))

    const editar = (produto: Produto) => {
        console.log(produto) 
    }

    const deletar = (produto: Produto) => {
        console.log(produto) 
    }
    
    return (
        <Layout titulo="Produtos">
            <Link href="/cadastro/produtos">
                <button className="button is-warning">Novo</button>
            </Link>
            <br/> <br/>
            <Loader show={!result} />
           <TabelaProdutos onEdit={editar} onDelete={deletar} produto={result?.data || []} />
        </Layout>
    )
}