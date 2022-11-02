import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post, Query, Req, Res
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(@Req() req, @Res() res): Movie[] {
    return this.moviesService.getAll();
  }
  
  //! search, :id 순서 :id가 앞일경우 /search 는 /:id로 인식한다.
  @Get("search")
  search(@Query("year") searchingYear: string){
    return `We are search for a movie made after: ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {    
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);    
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return {
        updateMovie: movieId,
        ...updateData,
    }
     //`This will update a movie with th id: ${movieId}`;
  }

}
