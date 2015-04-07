class BuddiesController < ApplicationController
  before_action :set_buddy, only: [:show, :edit, :update, :destroy]

  # GET /buddies
  # GET /buddies.json
  def index
    @buddies = current_user.buddies
  end

  # GET /buddies/1
  # GET /buddies/1.json
  def show
  end

  # GET /buddies/new
  def new
    @buddy = Buddy.new
  end

  # GET /buddies/1/edit
  def edit
  end

  # POST /buddies
  # POST /buddies.json
  def create
      @buddy = Buddy.new(buddy_params)
      user = User.where(:username => @buddy.username).first
      pet = load_pet
      @buddy.user = user
      @buddy.register = pet
      if !(user.blank?) then 
      respond_to do |format|
       if @buddy.save
         format.html { redirect_to @buddy, notice: 'Buddy was successfully created.' }
         format.json { render :show, status: :created, location: @buddy }
       else
         format.html { render :new }
         format.json { render json: @buddy.errors, status: :unprocessable_entity }
       end
     end
    else
     render 'new'
    end
  end

  # PATCH/PUT /buddies/1
  # PATCH/PUT /buddies/1.json
  def update
    respond_to do |format|
      if @buddy.update(buddy_params)
        format.html { redirect_to @buddy, notice: 'Buddy was successfully updated.' }
        format.json { render :show, status: :ok, location: @buddy }
      else
        format.html { render :edit }
        format.json { render json: @buddy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /buddies/1
  # DELETE /buddies/1.json
  def destroy
    @buddy.destroy
    respond_to do |format|
      format.html { redirect_to buddies_url, notice: 'Buddy was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  def load_pet
    pet_id = Rails.cache.read(:pet_id)
    pet = Register.where(:id => pet_id).first
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_buddy
      @buddy = Buddy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def buddy_params
      params.require(:buddy).permit(:username, :can_feed, :can_schedule)
    end
end
