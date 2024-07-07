import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"
import './css/style.css'
function App() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [nextPage, setNextPage] = useState('')
  const [prevPage, setPrevPage] = useState('')
  const [apiUrl, setApiUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [detail, setDetail] = useState(false)
  const [pokemonDetail, setPokemonDetail] = useState([])
  const getAllPokemon = async () => {

    const fetchApi = await fetch(apiUrl)
    const data = await fetchApi.json()

    setPrevPage(data.previous || '')
    setNextPage(data.next || '')

console.log(data)

    const pokemonDetail = await Promise.all(
      data.results.map(async (item) => {
        const fetchDetail = await fetch(item.url)
        const dataDetail = await fetchDetail.json()
        return dataDetail
      })
    )
    setPokemon(pokemonDetail)


    console.log(data.results)
    setLoading(false)

  }
  const getDetailPokemon = () => {
    console.log(pokemonDetail)
    return (
      <Detail>
        <li>{pokemonDetail.name}</li>
        {
          pokemonDetail.abilities.map((item, index) => {
            return <li key={index}>{item.ability.name}</li>
          })
        }
      </Detail>
    )
  }

  useEffect(() => {
    getAllPokemon()

  }, [apiUrl])
  return (
    <>
      {
        detail && getDetailPokemon()
      }
      <h1 style={{ textAlign: 'center' }}>Pokemon</h1>
      <Wrapper>
        {
          loading && <Loading>Loading...</Loading>
        }

        <h1 onClick={() => setApiUrl(prevPage)}>&lt;</h1>
        <ul>
          {pokemon.map((item, index) => {
            return (
              <Card key={index} onClick={() => { setDetail(true); setPokemonDetail(item) }}>
                <img src={item.sprites.front_default} alt="" />
                <li >{item.name}</li>
              </Card>
            )
          })}
        </ul>

          <h1 onClick={() => {setApiUrl(nextPage); console.log(nextPage)} }>&gt;</h1>

      </Wrapper>
    </>
  )
}
const Loading = styled.div`
font-size: 3rem;
width: 100%;
height: 100dvh;
display: flex;
justify-content: center;
align-items: center;
`
const Detail = styled.div`
position: absolute;

`

const Card = styled.div`
text-align: center;
box-shadow: 10px 10px 10px 0px rgba(185,181,181,0.75);
-webkit-box-shadow: 10px 10px 10px 0px rgba(185,181,181,0.75);
-moz-box-shadow: 10px 10px 10px 0px rgba(185,181,181,0.75);
border-radius: 0.5rem;
`



const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  
  
  h1{
    margin: 0 2rem;
    font-size: 3rem;
    color: white;
    background-color: rgb(21, 2, 107);
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    display: grid;
    font-family: Arial, Helvetica, sans-serif;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;
    list-style: none;
    padding: 0;
  }

  li{
    text-transform: capitalize;
    text-align: center;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: rgba(255, 226, 7, 0.5);
  }

`

export default App