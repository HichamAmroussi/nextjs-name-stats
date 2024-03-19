// Functions
const getNameGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io/?name=${name}`);

  return res.json();
}

const getNameNationalities = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`);

  return res.json();
}

const getNameAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`);

  return res.json();
}

// Interfaces
interface Params {
  params: { name: string };
}

export default async function page({ params }: Params) {
  const nameGenderData = await getNameGender(params.name);
  const nameNationalitiesData = await getNameNationalities(params.name);
  const nameAgeData = await getNameAge(params.name);
  let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

  const [genderObj, nationalitiesObj, AgeObj] = await Promise.all([
    nameGenderData,
    nameNationalitiesData,
    nameAgeData
  ])

  return (
    <main className="bg-white min-h-screen flex items-center justify-center">
      <table className="custom-table">
        <tbody>
          <tr>
            <td className="font-bold">Prénom</td>
            <td>{params.name}</td>
          </tr>
          <tr>
            <td className="font-bold">Genre</td>
            <td>{ genderObj?.gender == "male" 
              ? "Masculin ♂"
              : "Féminin ♀" 
            } </td>
          </tr>
          <tr>
            <td className="font-bold">Moyenne d&apos;age</td>
            <td>{AgeObj.age} ans</td>
          </tr>
          <tr>
            <td className="font-bold">Pays</td>
            <td><ul className="flex gap-10">
              {nationalitiesObj?.country?.map((nationality: any) => (
                <li className="flex flex-col items-center" key={nationality.probability}>
                  <img src={`https://flagsapi.com/${nationality.country_id}/shiny/64.png`} />
                  <p>{regionNames.of(nationality.country_id)}</p>
                  <p>{Math.trunc(nationality.probability * 100) + "%"}</p>
                </li>
              ))}
            </ul></td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}