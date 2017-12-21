class ProductService {

	search(uf, name, page){

	}

	searchBarcode(uf, barcode, page){

	}

	getGenericos(uf, apresentationId, page){

	}

	ranking(apresentacaoId){

	}

}


@GET("produtos/{uf}/")
Call<Aplicativo.ResultProduto> search(@Path("uf") String uf, @Query("nome") String nome, @Query("page") Integer pagina);

@GET("produtos/{uf}/")
Call<Aplicativo.ResultProduto> search_barcode(@Path("uf") String uf, @Query("codigo_barras") String codigoDeBarras, @Query("page") Integer pagina);

@GET("apresentacoes/{uf}/{apresentacaoID}/genericos/")
Call<Aplicativo.ResultGenerico> genericos(@Path("uf") String uf, @Path("apresentacaoID") Long apresentacaoID, @Query("page") Integer pagina);

@GET("produtos/v2/{uf}/")
Call<Aplicativo.ResultProdutoV2> searchV2(@Path("uf") String uf, @Query("nome") String nome, @Query("page") Integer pagina);

@GET("produtos/{uf}/")
Call<Aplicativo.ResultProdutoV2> searchBarcodeV2(@Path("uf") String uf, @Query("codigo_barras") String codigoDeBarras, @Query("page") Integer pagina);

@GET("apresentacoes/{uf}/")
Call<Aplicativo.ResultApresentacao> getApresentacoes(@Path("uf") String uf, @Query("nome") String nome, @Query("page") Integer pagina);

@POST("apresentacoes/{id}/ranking_visualizacao/")
Call<ResponseBody> ranking(@Path("id") Long id);