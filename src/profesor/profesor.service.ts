import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { UpdateProfesorDto } from './dto/update-profesor.dto';
import { Profesor } from './entities/profesor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { CursoService } from 'src/curso/curso.service';

@Injectable()
export class ProfesorService {
  remove(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) { }


  async createProfesor(nombre: string, curso: number): Promise<Profesor> {
    const nuevoProfesor = new Profesor();
    nuevoProfesor.nombre = nombre;
    nuevoProfesor.usuarioId = curso;

    return this.profesorRepository.save(nuevoProfesor);
  }

  async getAllProfesores(): Promise<Profesor[]> {
    return this.profesorRepository.find();
  }

  async findProfesorByUsuario(id: number): Promise<Profesor> {
    try {
      console.log(id)
      const profesor = await this.profesorRepository.findOne({ where: { usuarioId: id } });
      console.log(profesor)
      return profesor;

    } catch (error) {
      console.error(error);
      throw new Error(`No se puedo encontrar el profesor con usuarioId: ${id}`);
    }
  }

  async update(id: number, updateProfesorDto: UpdateProfesorDto): Promise<Profesor | undefined> {
    try {
      await this.profesorRepository.update(id, updateProfesorDto);
      return this.profesorRepository.findOne({ where: { idProfesor: id } });
    } catch (error) {
      // Handle error, e.g., log it
      console.error(error);
      throw new Error(`Could not update profesor with id: ${id}`);
    }
  }

 

}