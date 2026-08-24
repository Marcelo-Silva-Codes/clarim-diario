/* eslint-disable no-unused-vars */
import { useParams, Link} from 'react-router-dom'
// import { noticias } from '../../data/noticias'
import { buscarNoticias } from '../../services/noticias'
import './Materia.css'
import { useEffect, useState } from 'react'

function Materia(){
    // /maateria/3  ->  id: "3"  ->  id: 3  <- de string pra number ou int o id
    const { id } = useParams()

   const [noticias, setNoticias] = useState([])
     const [carregando, setCarregando] = useState(true)
     const [erro, setErro] = useState('')
     
     useEffect( () => {
       async function carregar(){
         try{
           setCarregando(true)
           setErro('')
           const dados = await buscarNoticias(id)
           setNoticias(dados)
         }
         catch{
           setErro('Matéria não encontrada - nem o Homem-Aranha some tão rápido')
         }finally{
           setCarregando(false)
         }
       }
       
       carregar()
     }, [id])

    // const noticia = noticias.find(n => n.id === Number(id))

    if(carregando){
        return <p className="aviso-tela">Carregando matéria...</p>
    }
     
    if(erro){
        return(
            <main className="container materia">
                <p className="aviso-tela">{erro}</p>
                <p style={{textAlign: 'center'}}>
                    <Link to="/"> - Voltar à capa</Link>
                </p>
            </main>
        )
    }

    // if(!noticia){
    //     return(
    //         <main className='container'>    
    //             <p>Máteria não encontrada - Nem o Homem-Aranha Destruiria uma Página tão Rápido.</p>
    //             <Link to="/">Voltar à capa</Link>
    //         </main>
    //     )
    // }

    return(
        <main className='container materia'>
            <Link to="/" className='materia__voltar'>Voltar à capa</Link>
            <span className='materia__categoria'>{noticias.categoria}</span>
            <h1>{noticias.titulo}</h1>
            <p className='materia__resumo'>{noticias.resumo}</p>
            <div className='materia__texto'>
                <p>{noticias.texto}</p>
            </div>

        </main>
    )

}

export default Materia