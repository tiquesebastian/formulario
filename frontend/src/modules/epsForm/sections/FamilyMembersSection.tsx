import type { FamilyMember } from '../types/familyMember'

// Componente alterno/legado para edición tabular de miembros del núcleo familiar.

interface FamilyMembersSectionProps {
  familyMembers: FamilyMember[]
  addFamilyMember: () => void
  updateFamilyMember: (id: string, field: keyof FamilyMember, value: string) => void
}

export function FamilyMembersSection({
  familyMembers,
  addFamilyMember,
  updateFamilyMember,
}: FamilyMembersSectionProps) {
  return (
    // Componente de tabla compacta (legado) para edición rápida de miembros familiares.
    <section className="border border-sky-300">
      <div className="bg-blue-600 px-3 py-2 text-sm font-bold text-white">
        IV. DATOS DE IDENTIFICACIÓN DE LOS MIEMBROS DEL NÚCLEO FAMILIAR
      </div>
      <div className="bg-blue-50 px-3 py-1 text-xs text-sky-900 border-b border-sky-300">
        Escriba únicamente en las letras que contengan el símbolo 'O' Comprobante Permanente
      </div>

      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-blue-600">
            <th className="border border-sky-300 px-1 py-1 text-white text-[8px] font-bold w-8"></th>
            <th colSpan={4} className="border border-sky-300 px-1 py-1 text-white text-[8px] font-bold">
              27. Apellidos y nombres
            </th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">28. Tipo de documento</th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">29. Número documento</th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">30. Sexo biológico</th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">31. Sexo identificación</th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">Cuál</th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">32. Nacionalidad</th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">33. Lugar nacimiento</th>
            <th className="border border-sky-300 px-1 py-1 text-white text-[7px] font-bold">34. Fecha nacimiento</th>
          </tr>
          <tr className="bg-white">
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]"></th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">P. Ap</th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">S. Ap</th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">P. Nom</th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">S. Nom</th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]"></th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]"></th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">F/M</th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">M/F/T/NB</th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]"></th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">País|Depto|Municipio</th>
            <th className="border border-sky-300 px-1 py-0.5 text-[7px]">D D M M A A A A</th>
          </tr>
        </thead>
        <tbody>
          {/* Render fijo de B1..B5 para conservar correspondencia visual con el formulario físico. */}
          {[...Array(5)].map((_, idx) => (
            <tr key={`B${idx + 1}`} className="hover:bg-gray-50">
              <td className="border border-sky-300 bg-blue-600 px-1 py-1 text-center text-white text-xs font-bold">
                B{idx + 1}
              </td>

              <td className="border border-sky-300 p-0">
                <input
                  type="text"
                  maxLength={15}
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.apellido1 || ''}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'apellido1', e.target.value)
                  }}
                />
              </td>

              <td className="border border-sky-300 p-0">
                <input
                  type="text"
                  maxLength={15}
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.apellido2 || ''}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'apellido2', e.target.value)
                  }}
                />
              </td>

              <td className="border border-sky-300 p-0">
                <input
                  type="text"
                  maxLength={15}
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.nombre1 || ''}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'nombre1', e.target.value)
                  }}
                />
              </td>

              <td className="border border-sky-300 p-0">
                <input
                  type="text"
                  maxLength={15}
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.nombre2 || ''}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'nombre2', e.target.value)
                  }}
                />
              </td>

              <td className="border border-sky-300 p-0">
                <select
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.tipoDocumento || 'CC'}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'tipoDocumento', e.target.value)
                  }}
                >
                  <option>CC</option>
                  <option>TI</option>
                  <option>CE</option>
                  <option>PA</option>
                </select>
              </td>

              <td className="border border-sky-300 p-0">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={12}
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.numeroDocumento || ''}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'numeroDocumento', e.target.value)
                  }}
                />
              </td>

              <td className="border border-sky-300 p-0">
                <select
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.sexoBiologico || 'F'}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'sexoBiologico', e.target.value)
                  }}
                >
                  <option>F</option>
                  <option>M</option>
                </select>
              </td>

              <td className="border border-sky-300 p-0">
                <select
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.sexoIdentificacion || 'F'}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'sexoIdentificacion', e.target.value)
                  }}
                >
                  <option>F</option>
                  <option>M</option>
                  <option>T</option>
                  <option>NB</option>
                  <option>Otro</option>
                </select>
              </td>

              <td className="border border-sky-300 p-0">
                <input
                  type="text"
                  maxLength={10}
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.sexoIdentificacionCual || ''}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'sexoIdentificacionCual', e.target.value)
                  }}
                />
              </td>

              <td className="border border-sky-300 p-0">
                <input
                  type="text"
                  maxLength={20}
                  className="w-full h-6 border-0 px-0.5 text-[7px] bg-white"
                  value={familyMembers[idx]?.nacionalidad || ''}
                  onChange={(e) => {
                    if (familyMembers.length <= idx) addFamilyMember()
                    updateFamilyMember(`B${idx + 1}`, 'nacionalidad', e.target.value)
                  }}
                />
              </td>

              <td className="border border-sky-300 p-0.5">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="País"
                    maxLength={12}
                    className="h-4 border border-sky-300 px-0.5 text-[6px] bg-white"
                    value={familyMembers[idx]?.paisNacimiento || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      updateFamilyMember(`B${idx + 1}`, 'paisNacimiento', e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Depto"
                    maxLength={12}
                    className="h-4 border border-sky-300 px-0.5 text-[6px] bg-white"
                    value={familyMembers[idx]?.departamentoNacimiento || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      updateFamilyMember(`B${idx + 1}`, 'departamentoNacimiento', e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Municipio"
                    maxLength={12}
                    className="h-4 border border-sky-300 px-0.5 text-[6px] bg-white"
                    value={familyMembers[idx]?.municipioNacimiento || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      updateFamilyMember(`B${idx + 1}`, 'municipioNacimiento', e.target.value)
                    }}
                  />
                </div>
              </td>

              <td className="border border-sky-300 p-0.5">
                <div className="flex gap-1 justify-center">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2.5 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoDia.charAt(0) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoDia || '').padStart(2, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoDia', e.target.value + val.charAt(1))
                    }}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2.5 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoDia.charAt(1) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoDia || '').padStart(2, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoDia', val.charAt(0) + e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2.5 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoMes.charAt(0) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoMes || '').padStart(2, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoMes', e.target.value + val.charAt(1))
                    }}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2.5 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoMes.charAt(1) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoMes || '').padStart(2, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoMes', val.charAt(0) + e.target.value)
                    }}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoAnio.charAt(0) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoAnio || '').padStart(4, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoAnio', e.target.value + val.slice(1))
                    }}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoAnio.charAt(1) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoAnio || '').padStart(4, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoAnio', val.charAt(0) + e.target.value + val.slice(2))
                    }}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoAnio.charAt(2) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoAnio || '').padStart(4, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoAnio', val.slice(0, 2) + e.target.value + val.charAt(3))
                    }}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-2 h-4 border border-sky-300 px-0 text-center text-[6px] bg-white"
                    value={familyMembers[idx]?.fechaNacimientoAnio.charAt(3) || ''}
                    onChange={(e) => {
                      if (familyMembers.length <= idx) addFamilyMember()
                      const val = (familyMembers[idx]?.fechaNacimientoAnio || '').padStart(4, ' ')
                      updateFamilyMember(`B${idx + 1}`, 'fechaNacimientoAnio', val.slice(0, 3) + e.target.value)
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
