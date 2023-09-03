const FileHandler = ({handleChange, selectedFile}) => {

    return <div className="relative w-full bg-zinc-900 rounded-md h-[46px] flex overflow-hidden mt-2">
                      <input
                        type="file"
                        name="file"
                        className="hidden"
                        id="fileInput"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="fileInput"
                        className="bg-zinc-900 border-r border-vprimary flex items-center justify-center h-[46px] w-[130px] cursor-pointer text-sm text-zinc-400 font-light"
                      >
                        Sélec. fichier
                      </label>
                      <span
                        className="ml-2 text-zinc-400 text-sm font-light flex items-center justify-center"
                        id="selectedFile"
                      >
                {selectedFile}
        </span>
    </div>
}

export default FileHandler